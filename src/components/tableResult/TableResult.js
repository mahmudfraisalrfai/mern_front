import { useEffect, useState } from "react";
import { getServerData } from "../../helper/helper";
import "./TableResult.css"; // استيراد ملف CSS

const TableResult = () => {
  const [data, setData] = useState();
  useEffect(() => {
    (async () => {
      try {
        await getServerData(
          `${process.env.REACT_APP_SERVER_HOSTNAME}/api/result`,
          (res) => setData(res)
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    })();
  }, []);
  return (
    <div className="table-container">
      <table className="styled-table">
        <thead>
          <tr>
            <th>{"username"}</th>
            <th>{"attempts"}</th>
            <th>{"points"}</th>
            <th>{"achived"}</th>
          </tr>
        </thead>
        <tbody>
          {data?.reverse().map((item, index) => (
            <tr key={index}>
              <td>{item?.username}</td>
              <td>{item?.attempts}</td>
              <td>{item?.points}</td>
              <td
                style={
                  item?.achived !== "passed"
                    ? { color: "#ff4d4d" }
                    : { color: "#00ff92" }
                }
              >
                {item?.achived}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableResult;
