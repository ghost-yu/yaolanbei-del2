(() => {
  const form = document.getElementById('selectionForm');
  const result = document.getElementById('selectionResult');
  if (!form || !result) return;

  const products = {
    pvL1: {
      title: '通用型光伏转光膜（L1）',
      summary: '适合标准化组件增效项目，优先控制初始投入并快速部署。',
      reason: '推荐理由：使用标准化数据库方案，适合预算敏感、交付周期紧的光伏项目。'
    },
    pvCustom: {
      title: '定制型光伏转光膜（L2/L3）',
      summary: '适用于TOPCon/HJT等技术路线，需要更高精度光谱适配。',
      reason: '推荐理由：可将光谱匹配误差控制在10nm内，并输出寿命与ROI测算报告。'
    },
    agriL1: {
      title: '通用型农用转光膜（L1）',
      summary: '适合规模化设施农业，兼顾增效需求与成本可控。',
      reason: '推荐理由：标准化配方交付快，适合普惠型与成长型农业客户。'
    },
    agriCustom: {
      title: '定制型农用转光膜（L2/L3）',
      summary: '适合高附加值作物与轮作种植，强调生长周期光谱匹配。',
      reason: '推荐理由：支持多波段动态调控，适配不同作物和不同阶段的精细化需求。'
    },
    service: {
      title: '数据库与技术服务（L4/企业版）',
      summary: '适合科研院所和企业研发中心，提供私有化部署与定制化模型训练。',
      reason: '推荐理由：企业版支持私有云、专属顾问和定制数据集（10万元起/套）。'
    }
  };

  function recommend(industry, medium, priority) {
    if (industry === 'research') return products.service;

    if (industry === 'pv') {
      if (priority === 'precision' || priority === 'life' || medium === 'nir') return products.pvCustom;
      return products.pvL1;
    }

    if (industry === 'agri') {
      if (priority === 'precision' || priority === 'life' || medium === 'multi') return products.agriCustom;
      return products.agriL1;
    }

    if (priority === 'cost') return products.pvL1;
    if (priority === 'precision') return products.pvCustom;
    return products.agriL1;
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const industry = document.getElementById('industrySelect').value;
    const medium = document.getElementById('mediumSelect').value;
    const priority = document.getElementById('prioritySelect').value;
    const item = recommend(industry, medium, priority);

    result.innerHTML = `
      <h5 class="mb-3">推荐结果</h5>
      <div class="h4 mb-2 text-primary">${item.title}</div>
      <p class="mb-2">${item.summary}</p>
      <p class="text-muted mb-0">${item.reason}</p>
    `;
  });
})();
