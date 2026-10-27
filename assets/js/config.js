/**
 * 全局配置 —— 后端对接时只需要改这里。
 *
 * USE_MOCK = true  : 所有数据来自 mock-data.js + localStorage，前端可脱离后端完整演示。
 * USE_MOCK = false : api.js 改为通过 fetch 请求 API_BASE，接口约定见 /docs/API.md。
 */
window.CL_CONFIG = {
  USE_MOCK: true,
  API_BASE: 'http://localhost:8080/api/v1',
  WS_BASE: 'ws://localhost:8080/ws',
  TOKEN_KEY: 'cl_token',
  UPLOAD_MAX_MB: 50,
  // mock 模式下模拟网络延迟（毫秒）
  MOCK_LATENCY: [120, 320],
};
