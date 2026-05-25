/**
 * Copyright (c) TonTech.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { useGaslessConfig } from '@ton/appkit-react';

export const UseGaslessConfigExample = () => {
    // SAMPLE_START: USE_GASLESS_CONFIG
    const { data: config, isLoading } = useGaslessConfig();

    if (isLoading) return <div>Loading relayer config...</div>;

    return (
        <select>
            {config?.supportedGasJettons.map((j) => (
                <option key={j.jettonMaster} value={j.jettonMaster}>
                    {j.jettonMaster}
                </option>
            ))}
        </select>
    );
    // SAMPLE_END: USE_GASLESS_CONFIG
};
