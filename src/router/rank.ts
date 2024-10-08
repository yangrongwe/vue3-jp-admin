// メニューのフルバージョンはより多く、ランクを引き出し、ここでメンテナンスが容易です。
// プラットフォームはホームルートのランクのみが0であることを規定しているため、バックエンドはランクを返すときに非 0から始める必要があります。
const home = 0,
  dashboard = 1,
  components = 2,
  methods = 3;

export { home, dashboard, components, methods };
