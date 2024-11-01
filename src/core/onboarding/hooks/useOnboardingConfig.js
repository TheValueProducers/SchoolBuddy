import React, {useContext, useRef, useState} from 'react';

export const OnboardingConfigContext = React.createContext({});

export const OnboardingConfigProvider = ({children, config}) => {
  const dialogRef = useRef();
  const [dialogData, setDialogData] = useState(null);

  const showDialog = data => {
    setDialogData(data);
    dialogRef.current.show();
  };
  const hideDialog = () => {
    dialogRef.current.hide();
    setDialogData(null);
  };

  const value = React.useMemo(
    () => ({config, showDialog, hideDialog, dialogData, dialogRef}),
    [config, dialogData],
  );
  return (
    <OnboardingConfigContext.Provider value={value}>
      {children}
    </OnboardingConfigContext.Provider>
  );
};

export const useOnboardingConfig = () => useContext(OnboardingConfigContext);
// TODO delete this file
