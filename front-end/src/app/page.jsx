import { Card } from "@/components/Card";

export default function Home() {
  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-[1440px] flex justify-end py-6">
        <div className="card-actions justify-end">
          <button className="btn btn-primary">My Cart</button>
        </div>
      </div>
      <div className="w-[1440px] grid grid-cols-3 gap-y-8">
        <div className="flex items-center justify-center">
          <Card />
        </div>
        <div className="flex items-center justify-center">
          <Card />
        </div>
        <div className="flex items-center justify-center">
          <Card />
        </div>
        <div className="flex items-center justify-center">
          <Card />
        </div>
      </div>
    </div>
  );
}
