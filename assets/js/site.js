(() => {
  const form = document.getElementById('requestForm');
  if (!form) return;
  const result = document.getElementById('requestResult');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const name = (data.get('name') || '').toString().trim();
    const company = (data.get('company') || '').toString().trim();
    result.textContent = `${name || '访客'}，已为 ${company || '贵单位'} 生成演示预约信息。当前交付为静态前端，可继续接入真实表单后端。`;
    form.reset();
  });
})();
