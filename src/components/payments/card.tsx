import colors from "tailwindcss/colors";
import { Card } from "../ui/card";
import SquareLoader from "react-spinners/ClimbingBoxLoader";
import { useEventRecords } from "../../hooks/event-records";
import { formatTimestamp } from "../../utils/date";

const formatPrincipal = (principal: string | undefined): string => {
  if (!principal) return "N/A";
  if (principal.length <= 14) return principal;
  return `${principal.slice(0, 7)}...${principal.slice(-7)}`;
};

export function PaymentsCard() {
  const { eventRecords } = useEventRecords();

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold mb-4">Events Log</h3>
        {/* <a href="#" className="hover:underline text-sm">
          More →
        </a> */}
      </div>
      <div className="max-h-[400px] overflow-y-auto">
        <table className="w-full text-sm">
          <thead>
            <tr>
              <th className="text-left py-2 px-2 text-gray-600 font-medium">
                ID
              </th>
              <th className="text-left py-2 px-2 text-gray-600 font-medium">
                Type
              </th>
              <th className="text-left py-2 px-2 text-gray-600 font-medium">
                Principal
              </th>
              <th className="text-left py-2 px-2 text-gray-600 font-medium">
                Date
              </th>
              {/* <th className="text-left py-2 px-2 text-gray-600 font-medium">
                Amount
              </th>
              <th className="text-left py-2 px-2 text-gray-600 font-medium">
                Pair
              </th>
              <th className="text-left py-2 px-2 text-gray-600 font-medium">
                From
              </th>
              <th className="text-left py-2 px-2 text-gray-600 font-medium">
                To
              </th> */}
            </tr>
          </thead>
          {!eventRecords && (
            <tbody>
              <div className="flex justify-center items-center h-full">
                <SquareLoader
                  className="mx-auto"
                  color={colors.amber[500]}
                  loading={true}
                  size={20}
                />
              </div>
            </tbody>
          )}
          <tbody>
            {eventRecords?.map((record, i) => (
              <tr key={i} className="border-t border-amber-600/10">
                <td className="py-2 px-2">#{record.id}</td>
                <td className="py-2 px-2">{record.type}</td>
                <td className="py-2 px-2">{formatPrincipal(record.userPrincipal?.toString())}</td>
                <td className="py-2 px-2">{formatTimestamp(record.timestamp)}</td>
                {/* <td className="py-2 px-2">{tx.amount}</td> */}
                {/* <td className="py-2 px-2">{tx.token}</td> */}
                {/* <td className="py-2 px-2">{tx.from}</td> */}
                {/* <td className="py-2 px-2">{tx.to}</td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
