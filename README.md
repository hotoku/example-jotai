# exapmle jotai

## やりたいこと

- コンポーネントAとコンポーネントBがある
- Aにはボタンがあり、そのクリックイベントで、データのfetchが開始される
- fetchが終わったら、Bに値が表示される
- Aのボタンが押される前は、Bにはnot loadedと表示されている
- データfetchの間は、Bにはloadingと表示されている。また、Aのボタンは無効化されている

## ポイント

### atomの定義

```typescript
const valAtom = atom<Promise<number> | undefined>(undefined);

const asyncAtom = atom(
  async (get) => {
    return await get(valAtom);
  },
  (_get, set, update: Promise<number>) => {
    set(valAtom, update);
  }
);
```

値を保持する`PrimitiveAtom`の`valAtom`と、それを参照する`asyncAtom`を定義している。

※ `valAtom`は`Promise<number> | undefined`なので、`await get(valAtom)`
でコンパイルエラーが出るかと思ったが出なかった。jotaiがケアしてくれている？

### 値の表示

コンポーネントBの実装は、以下のとおり。

```typescript
function CompB(): JSX.Element {
  const val = useAtomValue(valAtom);
  if (val) {
    return <div>{val}</div>;
  }
  return <div>not loaded</div>;
}
```

1. `val`の型は、`number | undefined`になる。jotaiが`Promise`を剥がしてくれている(たぶん)
1. `val`が`undefined`の場合は、not loadedを表示する。これは、普通に`val`の型を調べるだけ
1. jotaiが、Promiseが未解決の間はそれをthrowしてくれるので、`App`コンポーネントの中の`Suspense`が受け取って、fallbackを表示してくれる

### 値の取得

コンポーネントAの実装は、以下のとおり

```typescript
function CompA(): JSX.Element {
  const [loading, setLoading] = useState(false);
  const setVal = useSetAtom(asyncAtom);

  return (
    <button
      disabled={loading}
      onClick={(e) => {
        e.preventDefault();
        setLoading(true);
        setVal(
          download().then((v) => {
            setLoading(false);
            return v;
          })
        );
      }}
    >
      download
    </button>
  );
}
```

1. ボタンの`onClick`イベントのハンドラで、`download`を呼び出す
1. そして、その結果のPromiseを`asyncAtom`にsetする
1. `onClick`のハンドラで、ロード中か否かのフラグのケアも行っている
