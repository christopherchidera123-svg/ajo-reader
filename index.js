const setupPage = document.getElementById('setup-page');
const dashboardPage = document.getElementById('dashboard-page');
const setupForm = document.getElementById('setup-form');
const inviteForm = document.getElementById('invite-form');
const message = document.getElementById('form-message');
let ajo = JSON.parse(localStorage.getItem('ajoGroup'));

function formatMoney(amount) { return '₦' + Number(amount).toLocaleString(); }
function formatDate(date) { return new Date(date + 'T00:00:00').toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }); }
function showDashboard() {
  setupPage.classList.add('hidden'); dashboardPage.classList.remove('hidden');
  document.getElementById('display-name').textContent = ajo.owner;
  document.getElementById('display-group').textContent = ajo.group;
  document.getElementById('display-amount').textContent = formatMoney(ajo.amount);
  document.getElementById('display-start').textContent = formatDate(ajo.start);
  document.getElementById('display-end').textContent = formatDate(ajo.end);
  document.getElementById('member-count').textContent = ajo.members.length;
  const list = document.getElementById('member-list'); list.innerHTML = '';
  ajo.members.forEach(function (member) { const item = document.createElement('li'); item.textContent = member; list.appendChild(item); });
}
setupForm.addEventListener('submit', function (event) {
  event.preventDefault();
  const start = document.getElementById('start-date').value;
  const end = document.getElementById('end-date').value;
  if (end <= start) { message.textContent = 'Your end date must be after the start date.'; return; }
  const owner = document.getElementById('owner-name').value.trim();
  ajo = { owner: owner, group: document.getElementById('group-name').value.trim(), amount: document.getElementById('amount').value, start: start, end: end, members: [owner] };
  localStorage.setItem('ajoGroup', JSON.stringify(ajo)); showDashboard();
});
inviteForm.addEventListener('submit', function (event) {
  event.preventDefault(); const input = document.getElementById('member-name'); const name = input.value.trim();
  if (name) { ajo.members.push(name); localStorage.setItem('ajoGroup', JSON.stringify(ajo)); input.value = ''; showDashboard(); }
});
document.getElementById('start-over').addEventListener('click', function () {
  localStorage.removeItem('ajoGroup'); ajo = null; setupForm.reset(); message.textContent = '';
  dashboardPage.classList.add('hidden'); setupPage.classList.remove('hidden');
});
if (ajo) showDashboard();
