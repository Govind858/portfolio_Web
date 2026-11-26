import React, { useState, useEffect } from 'react';
import { motion, useSpring } from 'framer-motion';
import { Terminal, Copy, Check, RefreshCw, Server, Cpu, ShieldCheck, Activity } from 'lucide-react';
import { useMousePosition } from '../hooks/useMousePosition';
import { useDeviceOrientation } from '../hooks/useDeviceOrientation';

type TabKey = 'health' | 'k8s' | 'ble';

interface TerminalLine {
  type: 'command' | 'status' | 'header' | 'comment' | 'code';
  text?: string;
  highlight?: boolean;
  key?: string;
  val?: string;
}

interface SnippetData {
  filename: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  raw: string;
  lines: TerminalLine[];
}

export const HeroTerminal: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabKey>('health');
  const [copied, setCopied] = useState(false);
  const [pinging, setPinging] = useState(false);
  const [pingLatency, setPingLatency] = useState(14);

  // Parallax physics tracking
  const { normalizedX, normalizedY } = useMousePosition();
  const { tiltX, tiltY, isSupported: gyroSupported } = useDeviceOrientation();

  const activeX = gyroSupported && Math.abs(tiltX) > 0.05 ? tiltX : normalizedX;
  const activeY = gyroSupported && Math.abs(tiltY) > 0.05 ? tiltY : normalizedY;

  const springConfig = { stiffness: 100, damping: 22, mass: 0.9 };
  const smoothRotateX = useSpring(0, springConfig);
  const smoothRotateY = useSpring(0, springConfig);
  const smoothTranslateX = useSpring(0, springConfig);
  const smoothTranslateY = useSpring(0, springConfig);

  useEffect(() => {
    // Subtle tilt for high-end luxury feel without distortion
    smoothRotateX.set(-activeY * 8);
    smoothRotateY.set(activeX * 10);
    smoothTranslateX.set(activeX * 8);
    smoothTranslateY.set(activeY * 6);
  }, [activeX, activeY, smoothRotateX, smoothRotateY, smoothTranslateX, smoothTranslateY]);

  const handlePing = () => {
    setPinging(true);
    setTimeout(() => {
      setPingLatency(Math.floor(Math.random() * 8) + 9); // 9-16ms
      setPinging(false);
    }, 450);
  };

  const handleCopy = () => {
    const textToCopy = snippets[activeTab].raw;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const snippets: Record<TabKey, SnippetData> = {
    health: {
      filename: 'api-health.sh',
      icon: Activity,
      label: 'API GATEWAY HEALTH',
      raw: `curl -I https://api.govind.dev/v1/cluster-health
HTTP/2 200 OK
content-type: application/json; charset=utf-8
x-runtime: node-v20-slim (cluster mode)
x-proxy-engine: nginx/1.24 (worker_connections: 1024)
x-k8s-autoscale: active (hpa min:2 max:10 target:75% cpu)
x-cache-queue: redis + bullmq (settled: 1420 payouts)
x-client-resilience: failedQueue jwt silent refresh OK
status: all pods healthy (port 5000 bound)`,
      lines: [
        { type: 'command', text: '$ curl -I https://api.govind.dev/v1/cluster-health' },
        { type: 'status', text: 'HTTP/2 200 OK', highlight: true },
        { type: 'header', key: 'content-type', val: 'application/json; charset=utf-8' },
        { type: 'header', key: 'x-runtime', val: 'node-v20-slim (cluster mode)' },
        { type: 'header', key: 'x-proxy-engine', val: 'nginx/1.24 (worker_connections: 1024)' },
        { type: 'header', key: 'x-k8s-autoscale', val: 'active (hpa min:2 max:10 target:75% cpu)' },
        { type: 'header', key: 'x-cache-queue', val: 'redis + bullmq (settled: 1420 payouts)' },
        { type: 'header', key: 'x-client-resilience', val: 'failedQueue jwt silent refresh OK' },
        { type: 'comment', text: '# Cluster status: 0 dropped packets • Port 5000 reachable' },
      ],
    },
    k8s: {
      filename: 'k8s-deployment.yaml',
      icon: Cpu,
      label: 'KUBERNETES DEPLOYMENT',
      raw: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: bookmycuts-backend
spec:
  replicas: 3
  template:
    spec:
      containers:
      - name: api-server
        image: node:20-slim
        ports:
        - containerPort: 5000
        resources:
          limits: { cpu: "1000m", memory: "1Gi" }
          requests: { cpu: "500m", memory: "512Mi" }
---
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
spec:
  minReplicas: 2
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 75`,
      lines: [
        { type: 'code', text: 'apiVersion: apps/v1' },
        { type: 'code', text: 'kind: Deployment' },
        { type: 'code', text: 'metadata: { name: bookmycuts-backend }' },
        { type: 'code', text: 'spec:' },
        { type: 'code', text: '  replicas: 3  # HPA dynamically scales 2 to 10 pods' },
        { type: 'code', text: '  template:' },
        { type: 'code', text: '    spec:' },
        { type: 'code', text: '      containers:' },
        { type: 'code', text: '      - name: api-server' },
        { type: 'code', text: '        image: node:20-slim' },
        { type: 'code', text: '        ports: [{ containerPort: 5000 }]' },
        { type: 'code', text: '        resources:' },
        { type: 'code', text: '          limits: { cpu: "1", memory: "1Gi" }' },
        { type: 'code', text: '          requests: { cpu: "500m", memory: "512Mi" }' },
      ],
    },
    ble: {
      filename: 'ble-printer.ts',
      icon: Server,
      label: 'HARDWARE BLE DRIVER',
      raw: `// Coffy Byte: 20-byte packet pagination with 50ms interval to prevent buffer overflow
async function writeToPrinter(device: BleDevice, hexPayload: Uint8Array): Promise<void> {
  const CHUNK_SIZE = 20;
  const DELAY_MS = 50;
  
  for (let i = 0; i < hexPayload.length; i += CHUNK_SIZE) {
    const chunk = hexPayload.slice(i, i + CHUNK_SIZE);
    await device.writeCharacteristicWithResponseForService(
      ESC_POS_SERVICE_UUID,
      ESC_POS_CHARACTERISTIC_UUID,
      Buffer.from(chunk).toString('base64')
    );
    await new Promise((res) => setTimeout(res, DELAY_MS));
  }
  // Result: Zero dropped thermal receipts during peak hours
}`,
      lines: [
        { type: 'comment', text: '// Hardware Throttling: 20-byte chunks + 50ms interval' },
        { type: 'code', text: 'async function writeToPrinter(device: BleDevice, rawHex: Uint8Array) {' },
        { type: 'code', text: '  const CHUNK_SIZE = 20;' },
        { type: 'code', text: '  const THROTTLE_DELAY_MS = 50;' },
        { type: 'code', text: '  for (let i = 0; i < rawHex.length; i += CHUNK_SIZE) {' },
        { type: 'code', text: '    const chunk = rawHex.slice(i, i + CHUNK_SIZE);' },
        { type: 'code', text: '    await device.writeCharacteristic(ESC_POS_UUID, chunk);' },
        { type: 'code', text: '    await delay(THROTTLE_DELAY_MS);' },
        { type: 'code', text: '  }' },
        { type: 'comment', text: '  // Confirmed: 0.00% dropped receipt rate during rush hours' },
        { type: 'code', text: '}' },
      ],
    },
  };

  const current = snippets[activeTab];

  return (
    <div className="relative w-full max-w-2xl sm:max-w-3xl mx-auto my-5 sm:my-8 sm:px-2 select-none">
      {/* Ambient Radial Backlight Glow */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-white/[0.08] via-zinc-500/[0.05] to-transparent blur-[60px] sm:blur-[80px] pointer-events-none" />

      {/* Floating 3D Perspective Card */}
      <motion.div
        style={{
          perspective: 1200,
          rotateX: smoothRotateX,
          rotateY: smoothRotateY,
          x: smoothTranslateX,
          y: smoothTranslateY,
          transformStyle: 'preserve-3d',
        }}
        className="relative rounded-2xl sm:rounded-3xl glass-panel bg-zinc-950/85 border border-white/15 shadow-[0_25px_60px_rgba(0,0,0,0.95)] overflow-hidden text-left"
      >
        {/* Terminal Window Chrome / Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2.5 px-3.5 py-3 sm:px-5 sm:py-3.5 bg-zinc-900/90 border-b border-white/10">
          
          {/* Window Buttons & Session Label */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
              <div className="flex items-center gap-1.5 shrink-0">
                <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-rose-500/80 border border-rose-400/30" />
                <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-amber-500/80 border border-amber-400/30" />
                <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-emerald-500/80 border border-emerald-400/30" />
              </div>

              <div className="h-4 w-px bg-white/10 hidden sm:block" />

              <div className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-mono text-zinc-300 truncate">
                <Terminal className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                <span className="truncate">govind@cluster-01: ~</span>
              </div>
            </div>

            {/* Mobile Ping & Copy Tools */}
            <div className="flex md:hidden items-center gap-1.5 text-[11px] font-mono shrink-0">
              <button
                onClick={handlePing}
                disabled={pinging}
                className="flex items-center gap-1 px-2 py-1 rounded-lg bg-white/5 hover:bg-white/15 text-zinc-300 border border-white/10"
                title="Ping Cluster Gateway"
              >
                <RefreshCw className={`w-3 h-3 ${pinging ? 'animate-spin text-emerald-400' : 'text-zinc-400'}`} />
                <span>{pinging ? '...' : `${pingLatency}ms`}</span>
              </button>
              <button
                onClick={handleCopy}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-zinc-400 border border-white/10"
                title="Copy snippet"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              </button>
            </div>
          </div>

          {/* Tab Switcher Buttons */}
          <div className="grid grid-cols-3 md:flex items-center gap-1 p-0.5 rounded-xl bg-zinc-950/80 border border-white/10 text-[11px] sm:text-xs font-mono">
            <button
              onClick={() => setActiveTab('health')}
              className={`px-2 sm:px-3 py-1.5 sm:py-1 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                activeTab === 'health'
                  ? 'bg-white text-black font-semibold shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Activity className="w-3 h-3 shrink-0" />
              <span className="truncate">health.sh</span>
            </button>

            <button
              onClick={() => setActiveTab('k8s')}
              className={`px-2 sm:px-3 py-1.5 sm:py-1 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                activeTab === 'k8s'
                  ? 'bg-white text-black font-semibold shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Cpu className="w-3 h-3 shrink-0" />
              <span className="truncate">k8s.yaml</span>
            </button>

            <button
              onClick={() => setActiveTab('ble')}
              className={`px-2 sm:px-3 py-1.5 sm:py-1 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                activeTab === 'ble'
                  ? 'bg-white text-black font-semibold shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Server className="w-3 h-3 shrink-0" />
              <span className="truncate">ble-pos.ts</span>
            </button>
          </div>

          {/* Desktop Action Tools */}
          <div className="hidden md:flex items-center gap-2 text-xs font-mono shrink-0">
            <button
              onClick={handlePing}
              disabled={pinging}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/15 text-zinc-300 hover:text-white border border-white/10 transition-all active:scale-95"
              title="Ping Cluster Gateway"
            >
              <RefreshCw className={`w-3 h-3 ${pinging ? 'animate-spin text-emerald-400' : 'text-zinc-400'}`} />
              <span>{pinging ? 'PINGING...' : `${pingLatency}ms`}</span>
            </button>

            <button
              onClick={handleCopy}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-zinc-400 hover:text-white border border-white/10 transition-all active:scale-95"
              title="Copy snippet"
            >
              {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
            </button>
          </div>
        </div>

        {/* Terminal Body with Monospace Code Display */}
        <div className="p-3.5 sm:p-6 font-mono text-[11px] sm:text-[13px] leading-relaxed overflow-x-auto min-h-[200px] sm:min-h-[260px] bg-black/60 select-text">
          <div className="space-y-1.5 min-w-0">
            {current.lines.map((item, idx) => {
              if (item.type === 'command') {
                return (
                  <div key={idx} className="flex items-center gap-2 text-white font-bold pb-1">
                    <span className="text-emerald-400">$</span>
                    <span>{item.text ? item.text.replace('$ ', '') : ''}</span>
                  </div>
                );
              }
              if (item.type === 'status') {
                return (
                  <div key={idx} className="flex items-center gap-2 text-emerald-400 font-bold py-0.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>{item.text}</span>
                  </div>
                );
              }
              if (item.type === 'header') {
                return (
                  <div key={idx} className="flex items-start gap-2">
                    <span className="text-zinc-400">{item.key}:</span>
                    <span className="text-zinc-200">{item.val}</span>
                  </div>
                );
              }
              if (item.type === 'comment') {
                return (
                  <div key={idx} className="text-zinc-400 italic pt-1">
                    {item.text}
                  </div>
                );
              }
              return (
                <div key={idx} className="text-zinc-300 font-mono">
                  {item.text}
                </div>
              );
            })}
          </div>

          {/* Active Terminal Cursor */}
          <div className="mt-3 flex items-center gap-1 text-zinc-500">
            <span className="w-2 h-4 bg-emerald-400 animate-pulse inline-block" />
            <span className="text-[11px] text-zinc-400 font-mono">cluster listening on port 5000</span>
          </div>
        </div>

        {/* Terminal Footer Status Bar */}
        <div className="px-3.5 py-2 sm:px-6 sm:py-2.5 bg-zinc-900/80 border-t border-white/10 flex flex-wrap items-center justify-between gap-x-3 gap-y-1 text-[10px] sm:text-[11px] font-mono text-zinc-400">
          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
            <span className="flex items-center gap-1.5 text-zinc-300">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>K8S AUTOSCALE: 2-10 PODS</span>
            </span>
            <span className="hidden sm:inline">•</span>
            <span>NGINX: 1,024 CONNS</span>
          </div>

          <div className="flex items-center gap-2.5 text-zinc-400">
            <span>BULLMQ: ACTIVE</span>
            <span>•</span>
            <span className="text-emerald-400">STATUS: HEALTHY</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
