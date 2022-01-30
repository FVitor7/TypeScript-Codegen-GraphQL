import { useMemo } from "react";
import { useCarsQuery } from "../../graphql";
import Pill from "../Pill";

const Cars: React.FC = () => {
  const context = useMemo(() => ({ additionalTypenames: ["Car"] }), []);
  const [{ data, fetching }] = useCarsQuery({ context });
  if (fetching) return <div>Loading</div>;
  if (data?.cars.length === 0) return <div>No cars yet</div>;
  return (
    <div className="flex flex-nowrap space-x-1 overflow-auto">
      {data?.cars.map(({ name, brand }, index) => (
        <Pill key={index}>
          {name} {brand && `at ${brand.name}`}
        </Pill>
      ))}
    </div>
  );
};

export default Cars;
