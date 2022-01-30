import { useMemo } from "react";
import { useBrandsQuery } from "../../graphql";
import Pill from "../Pill";

const Brands: React.FC = () => {
  const context = useMemo(() => ({ additionalTypenames: ["brand"] }), []);
  const [{ data, fetching }] = useBrandsQuery({ context });
  if (fetching) return <div>Loading</div>;

  if (data?.brands.length === 0) return <div>No brands yet</div>;
  return (
    <div className="flex flex-nowrap space-x-1 overflow-auto">
      {data?.brands.map(({ name }, index) => (
        <Pill key={index}>{name}</Pill>
      ))}
    </div>
  );
};

export default Brands;
