export default async function LogExplorer({ params }: any) {
  const { path = [] } = await params;
  return <div className="bg-black text-green-400 p-10 font-mono min-h-[500px] rounded-xl">Current Path: /logs/{path.join('/')}</div>;
}
