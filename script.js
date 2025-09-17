document.getElementById('btn').addEventListener('click', () => {
  const p = document.getElementById('msg');
  p.textContent = 'Button clicked! Deployed at ' + new Date().toLocaleString();
  console.log('Button clicked — site is live.');
});
