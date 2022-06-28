export default async function apiToken() {
  const url = 'https://opentdb.com/api_token.php?command=request';
  const response = await fetch(url);
  const result = await response.json();
  return result;
}
