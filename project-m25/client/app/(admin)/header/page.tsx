export default function Header({ title }:any) {
    return (
      <div className="bg-gray-100 h-16 flex items-center justify-between px-8">
        <h1 className="text-2xl font-semibold">{title}</h1>
      </div>
    );
  }
  