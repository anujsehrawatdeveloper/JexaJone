const countryCode = getCookie('countryCode');

if (countryCode) {
  const isMainDomain = window.location.host == "ok.xxx";
  const pathName = window.location.pathname;

  if (isMainDomain) {
    window.location.href = `//${countryCode}.ok.xxx${pathName}`;
  }
}

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}