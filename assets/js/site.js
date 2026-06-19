(() => {
  const form = document.getElementById('requestForm');
  if (!form) return;
  const result = document.getElementById('requestResult');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const name = (data.get('name') || '').toString().trim();
    const company = (data.get('company') || '').toString().trim();
    result.textContent = `${name || '访客'}，已为 ${company || '贵单位'} 生成咨询登记信息。后续可接入真实表单服务与 CRM 流程。`;
    form.reset();
  });
})();
