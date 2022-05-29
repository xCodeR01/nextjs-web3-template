export function useContract<T>(contract: T) {
  //   const connector = usePriorityConnector();
  //   const provider = usePriorityProvider();

  //   contract = contract.connect(provider);

  //   if (getConnectorName(connector) !== "Network") {
  //     const signer = provider?.getSigner?.();
  //     if (signer !== undefined) contract = contract.connect(signer);
  //   }

  return contract;
}
