(() => {
  const roleButtons = Array.from(document.querySelectorAll('[data-role]'));
  const materialButtons = Array.from(document.querySelectorAll('[data-material]'));
  const stageButtons = Array.from(document.querySelectorAll('[data-stage-output]'));
  const roleBadge = document.getElementById('roleBadge');
  const roleSummary = document.getElementById('roleSummary');
  const metric1 = document.getElementById('metric1');
  const metric2 = document.getElementById('metric2');
  const metric3 = document.getElementById('metric3');
  const metric4 = document.getElementById('metric4');
  const stageOutput = document.getElementById('stageOutput');
  const materialName = document.getElementById('materialName');
  const materialLevel = document.getElementById('materialLevel');
  const materialComposition = document.getElementById('materialComposition');
  const materialMoisture = document.getElementById('materialMoisture');
  const materialTarget = document.getElementById('materialTarget');
  const materialPrice = document.getElementById('materialPrice');
  const traceList = document.getElementById('traceList');
  const orderTableBody = document.getElementById('orderTableBody');
  const reportButton = document.getElementById('reportButton');
  const reportOutput = document.getElementById('reportOutput');
  const dealForm = document.getElementById('dealForm');
  const dealResult = document.getElementById('dealResult');

  const roles = {
    pv: {
      label: '光伏客户视角',
      summary: '关注波段匹配、组件寿命和单位增益回报。',
      metrics: ['126 组', '9.6 nm', '18 批次', '14 月'],
      chartA: [16, 22, 27, 31, 36, 40],
      chartB: [9, 13, 18, 22, 27, 31],
      orders: [
        ['PV-260401', '方案确认', '1200 ㎡', 'TOPCon线'],
        ['PV-260388', '中试中', '800 ㎡', '小试吹膜'],
        ['PV-260372', '量产评估', '3000 ㎡', '寿命验证']
      ]
    },
    agri: {
      label: '农业客户视角',
      summary: '关注轮作适配、增产收益与膜材稳定性。',
      metrics: ['94 组', '11.2 nm', '22 批次', '9 月'],
      chartA: [12, 17, 21, 25, 29, 34],
      chartB: [7, 11, 15, 19, 22, 26],
      orders: [
        ['AG-260211', '方案确认', '600 亩', '设施农业'],
        ['AG-260204', '田间验证', '240 亩', '轮作场景'],
        ['AG-260196', '复测中', '120 亩', '铺膜跟踪']
      ]
    },
    research: {
      label: '科研服务视角',
      summary: '关注数据库权限、模型训练与知识产权输出。',
      metrics: ['38 家', '99%', '47 项', '6 周'],
      chartA: [8, 11, 13, 16, 18, 22],
      chartB: [4, 6, 8, 10, 12, 15],
      orders: [
        ['RS-260099', '企业版', '1 套', '私有云部署'],
        ['RS-260087', '定制集', '2 套', '数据采集'],
        ['RS-260081', '顾问中', '持续', '模型优化']
      ]
    }
  };

  const materials = {
    pvTopcon: {
      name: 'TOPCon 光伏方案 A',
      level: 'L2',
      composition: '目标波段 780-950nm / 匹配误差 9.2nm',
      moisture: '寿命目标 25 年',
      target: '适配高效率组件增效与户外长期工况',
      price: '建议报价区间：按项目测算',
      trace: ['客户提交目标波长与预算', 'PINN模型完成逆向配方搜索', '输出光谱匹配与寿命预测', '小试样膜完成测试', '形成中试放大建议']
    },
    agriCrop: {
      name: '设施农业方案 B',
      level: 'L3',
      composition: '红蓝光配比定制 / 多波段兼容',
      moisture: '寿命目标 3-5 年',
      target: '适配轮作与高附加值作物种植场景',
      price: '建议报价区间：按场景分级',
      trace: ['客户提交作物与生长周期', '模型匹配作物光谱窗口', '生成轮作兼容配方', '完成吹膜与机械性能测试', '进入田间铺膜验证']
    },
    researchSet: {
      name: '科研专属数据集方案',
      level: 'L4',
      composition: '私有数据集 + 定制模型训练',
      moisture: '交付周期 4-8 周',
      target: '适配高校课题组和企业研发中心',
      price: '定制化专属数据集：10万元起/套',
      trace: ['定义研究问题与指标边界', '建设专属数据结构', '模型训练与交叉验证', '输出报告与接口', '持续迭代与顾问支持']
    }
  };

  let currentRole = 'pv';
  let currentMaterial = 'pvTopcon';
  let chart;

  function renderOrders(items) {
    orderTableBody.innerHTML = items.map(row => `
      <tr>
        <td>${row[0]}</td>
        <td><span class="badge badge-pill badge-primary">${row[1]}</span></td>
        <td>${row[2]}</td>
        <td>${row[3]}</td>
      </tr>
    `).join('');
  }

  function renderMaterial(key) {
    currentMaterial = key;
    const item = materials[key];
    materialName.textContent = item.name;
    materialLevel.textContent = item.level;
    materialComposition.textContent = item.composition;
    materialMoisture.textContent = item.moisture;
    materialTarget.textContent = item.target;
    materialPrice.textContent = item.price;
    traceList.innerHTML = item.trace.map(text => `<li>${text}</li>`).join('');
    materialButtons.forEach(btn => {
      if (btn.dataset.material === key) btn.classList.add('active');
      else btn.classList.remove('active');
    });
  }

  function renderRole(role) {
    currentRole = role;
    const cfg = roles[role];
    roleBadge.textContent = cfg.label;
    roleSummary.textContent = cfg.summary;
    [metric1.textContent, metric2.textContent, metric3.textContent, metric4.textContent] = cfg.metrics;
    renderOrders(cfg.orders);
    if (chart) {
      chart.data.datasets[0].data = cfg.chartA;
      chart.data.datasets[1].data = cfg.chartB;
      chart.update();
    }
    roleButtons.forEach(btn => {
      if (btn.dataset.role === role) {
        btn.classList.remove('btn-outline-primary');
        btn.classList.add('btn-primary');
      } else {
        btn.classList.add('btn-outline-primary');
        btn.classList.remove('btn-primary');
      }
    });
  }

  function initChart() {
    const ctx = document.getElementById('supplyChart');
    if (!ctx || typeof Chart === 'undefined') return;
    chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['1月', '2月', '3月', '4月', '5月', '6月'],
        datasets: [
          {
            label: '需求输入量',
            data: roles[currentRole].chartA,
            borderColor: 'rgba(78, 115, 223, 1)',
            backgroundColor: 'rgba(78, 115, 223, 0.1)',
            pointRadius: 3,
            lineTension: 0.3
          },
          {
            label: '方案确认量',
            data: roles[currentRole].chartB,
            borderColor: 'rgba(28, 200, 138, 1)',
            backgroundColor: 'rgba(28, 200, 138, 0.08)',
            pointRadius: 3,
            lineTension: 0.3
          }
        ]
      },
      options: {
        maintainAspectRatio: false,
        legend: { display: true },
        scales: { yAxes: [{ ticks: { beginAtZero: true } }] }
      }
    });
  }

  roleButtons.forEach(btn => btn.addEventListener('click', () => renderRole(btn.dataset.role)));
  materialButtons.forEach(btn => btn.addEventListener('click', () => renderMaterial(btn.dataset.material)));

  stageButtons.forEach(btn => btn.addEventListener('click', () => {
    stageOutput.textContent = btn.dataset.stageOutput;
    stageButtons.forEach(item => {
      item.classList.remove('btn-primary');
      item.classList.add('btn-outline-primary');
    });
    btn.classList.add('btn-primary');
    btn.classList.remove('btn-outline-primary');
  }));

  reportButton.addEventListener('click', () => {
    const item = materials[currentMaterial];
    const role = roles[currentRole];
    reportOutput.innerHTML = `已生成：<strong>${item.name}</strong> 报告摘要。当前以 <strong>${role.label}</strong> 输出：方案已覆盖需求确认、模型匹配、样品验证和交付建议，可继续导出ROI测算与阶段计划。`;
  });

  dealForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const product = document.getElementById('dealProduct').value;
    const quantity = document.getElementById('dealQuantity').value;
    const remark = document.getElementById('dealRemark').value;
    const code = `INT-${Math.floor(Math.random() * 900 + 100)}`;
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${code}</td>
      <td><span class="badge badge-pill badge-info">意向单</span></td>
      <td>${quantity}</td>
      <td>${product}</td>
    `;
    orderTableBody.prepend(row);
    dealResult.textContent = `已创建 ${product} 意向单，备注：${remark}`;
    dealForm.reset();
    document.getElementById('dealQuantity').value = '按项目';
    document.getElementById('dealRemark').value = '优先看交付周期与ROI';
  });

  initChart();
  renderRole(currentRole);
  renderMaterial(currentMaterial);
})();
