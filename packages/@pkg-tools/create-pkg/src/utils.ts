export function packageManagerFromUserAgent() {
  const pkgUserAgent = process.env.npm_config_user_agent;

  if (!pkgUserAgent) {
    return { name: 'npm' };
  }
  const [name] = pkgUserAgent.split(' ')[0].split('/');

  return {
    name,
  };
}
