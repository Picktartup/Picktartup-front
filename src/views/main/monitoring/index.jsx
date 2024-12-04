import React, { useState, useEffect } from "react";
import LineChartComponent from "components/charts/LineChart2";
import BarChartComponent from "components/charts/BarChart2";
import PieChartComponent from "components/charts/PieChart2";
import AreaChartComponent from "components/charts/AreaChart";

const Dashboard = () => {
  const [heapMemory, setHeapMemory] = useState([]);
  const [nonHeapMemory, setNonHeapMemory] = useState([]);
  const [threadCount, setThreadCount] = useState([]);
  const [gcActivity, setGcActivity] = useState([]);

  // Prometheus API 요청 함수
  const fetchPrometheusData = async (query) => {
    const prometheusBaseUrl = "http://localhost:9090/api/v1/query";
    const response = await fetch(`${prometheusBaseUrl}?query=${query}`);
    const data = await response.json();
    return data;
  };

  // 데이터 변환 및 상태 업데이트
  const transformAndSetData = async () => {
    try {
      // JVM Heap 메모리 사용량
      const heapData = await fetchPrometheusData("jvm_memory_used_bytes{area='heap'}");
      const transformedHeapData = heapData.data.result.map((metric) => ({
        time: new Date().toLocaleTimeString(),
        value: parseFloat(metric.value[1]),
      }));
      setHeapMemory((prev) => [...prev.slice(-20), ...transformedHeapData]);

      // JVM Non-Heap 메모리 사용량
      const nonHeapData = await fetchPrometheusData("jvm_memory_used_bytes{area='nonheap'}");
      const transformedNonHeapData = nonHeapData.data.result.map((metric) => ({
        time: new Date().toLocaleTimeString(),
        value: parseFloat(metric.value[1]),
      }));
      setNonHeapMemory((prev) => [...prev.slice(-20), ...transformedNonHeapData]);

      // JVM 스레드 수
      const threadData = await fetchPrometheusData("jvm_threads_live");
      const transformedThreadData = threadData.data.result.map((metric) => ({
        time: new Date().toLocaleTimeString(),
        value: parseInt(metric.value[1], 10),
      }));
      setThreadCount((prev) => [...prev.slice(-20), ...transformedThreadData]);

      // JVM GC (Garbage Collector) 활동
      const gcData = await fetchPrometheusData("jvm_gc_pause_seconds_sum");
      const transformedGcData = gcData.data.result.map((metric) => ({
        name: metric.metric.gc,
        value: parseFloat(metric.value[1]),
      }));
      setGcActivity(transformedGcData);
    } catch (error) {
      console.error("Error fetching or transforming Prometheus data:", error);
    }
  };

  useEffect(() => {
    // 10초마다 Prometheus 데이터를 갱신
    const interval = setInterval(transformAndSetData, 10000);

    // 컴포넌트 언마운트 시 interval 정리
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-8">JVM 실시간 대시보드</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* JVM Heap 메모리 - 라인 차트 */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Heap Memory Usage</h2>
          <LineChartComponent data={heapMemory} />
        </div>

        {/* JVM Non-Heap 메모리 - 영역 차트 */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Non-Heap Memory Usage</h2>
          <AreaChartComponent data={nonHeapMemory} />
        </div>

        {/* JVM 스레드 수 - 바 차트 */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Thread Count</h2>
          <BarChartComponent data={threadCount} />
        </div>

        {/* JVM GC 활동 - 파이 차트 */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Garbage Collection Activity</h2>
          <PieChartComponent data={gcActivity} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
