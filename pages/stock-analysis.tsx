import { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

interface LogEntry {
  time: string;
  stock: string;
  rsi: number;
  price: number;
}

const RsiOverTime = ({symbol, data}) => (
  <div className="flex-1">
              <h2 className="text-xl font-bold">RSI Over Time</h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data}>
                  <XAxis dataKey="time" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Line type="monotone" dataKey="rsi" stroke="#8884d8" strokeWidth={1} />
                </LineChart>
              </ResponsiveContainer>
            </div>
)

const PriceOverTime = ({symbol, data}) => {
  const stockData = data || [];
  const pricesOnlyNumbers = stockData.map(entry => entry.price).filter(d => !Number.isNaN(d));
  const minPrice = Math.min(...pricesOnlyNumbers);
  const maxPrice = Math.max(...pricesOnlyNumbers);
  const priceDomain = pricesOnlyNumbers.length > 0 ? [minPrice * 0.98, maxPrice * 1.02] : [0, 100];
  return (
  <div className="flex-1">
              <h2 className="text-xl font-bold">Price Over Time</h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data || []}>
                  <XAxis dataKey="time" />
                  <YAxis domain={priceDomain} tickFormatter={(value) => value.toFixed(2)}/>
                  <Tooltip />
                  <Line type="monotone" dataKey="price" stroke="#82ca9d" strokeWidth={1} />
                </LineChart>
              </ResponsiveContainer>
            </div>
)
}

const StockCharts = ({ logs, stockSymbols }) => {
  const [dataByStock, setDataByStock] = useState<Record<string, LogEntry[]>>({});

  useEffect(() => {
    const parsedData: Record<string, LogEntry[]> = {};
    
    logs.forEach(log => {
      let jsonLog;
      try {
        jsonLog = JSON.parse(log)
        if (!stockSymbols.includes(jsonLog.stock)) return;
        
        if (!parsedData[jsonLog.stock]) {
          parsedData[jsonLog.stock] = [];
        }
        
        parsedData[jsonLog.stock].push({
          time: new Date(jsonLog.time).toLocaleTimeString(),
          rsi: parseFloat(jsonLog.rsi),
          price: parseFloat(jsonLog.price),
          stock: jsonLog.stock
        });
      } catch (error) {
        console.error("JSON parsing error:", error, "Log:", jsonLog);
      }
    });
    
    setDataByStock(parsedData);
  }, [logs, stockSymbols]);

  return (
    <div className="flex flex-col gap-8">
      {stockSymbols.map(stockSymbol => {
        
        return (
          <section className=" p-8" key={stockSymbol}>
            <h3>{stockSymbol}</h3>
            <div key={stockSymbol} className="flex gap-4">
              <RsiOverTime symbol={stockSymbol} data={dataByStock[stockSymbol] || []}/>   
              <PriceOverTime symbol={stockSymbol} data={dataByStock[stockSymbol]}/>
            </div>
          </section>
        )
      })}
    </div>
  );
};




const fetchLogs = async (): Promise<LogEntry[]> => {
  const res = await fetch('/api/logs');
  return res.json();
};

const StockAnalysis = () => {
  const [logs, setLogs] = useState<LogEntry[]>([]);

  useEffect(() => {
    fetchLogs().then(setLogs);
  }, []);
  return <StockCharts  logs={logs.map(log => JSON.stringify(log))}stockSymbols={["NVDA","SPY"]} />;
};

export default StockAnalysis;