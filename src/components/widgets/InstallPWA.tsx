import { useEffect, useState } from "react"

export const InstallPWA = () => {
  const [supportsPWA, setSupportsPWA] = useState(false);
  const [promptInstall, setPromptInstall] = useState(null as any);

  useEffect(() => {
    const handler = (event: any) => {
      event.preventDefault();
      console.log('Trigger PWA install');
      setSupportsPWA(true);
      setPromptInstall(event);
    };
    window.addEventListener('beforeinstallprompt', handler);

    return () => window.removeEventListener('transitioned', handler);
  }, []);

    const onClick = (event: any) => {
      event.preventDefault();
      if (!promptInstall) {
        return;
      }
      promptInstall.prompt();
    }

    if(!supportsPWA) {
      return null;
    }

    return (
      <button
        className="link-button"
        id="setup-button"
        aria-label="Install app"
        title="Install app"
        onClick={onClick}
      >
        Install
      </button>
    )


}