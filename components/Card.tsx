

type CardProps = {

    title: string;
    body: string;
};
    export default function Card({ title, body }: CardProps) {

    return (
      <div className="rounded-lg dark:bg-red-100 bg-blue-100 p-4">
        <h2 className="text-lg font-bold">{title}</h2>
        <p className="mt-2 text-slate-600">{body}</p>
      </div>
    );
}