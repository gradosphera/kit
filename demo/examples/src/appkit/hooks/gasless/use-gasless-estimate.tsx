/**
 * Copyright (c) TonTech.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import type { Base64String } from '@ton/appkit';
import { useGaslessEstimate } from '@ton/appkit-react';

export const UseGaslessEstimateExample = () => {
    // SAMPLE_START: USE_GASLESS_ESTIMATE
    const { data: estimate, isFetching } = useGaslessEstimate({
        feeJettonMaster: 'EQCxE6mUtQJKFnGfaROTKOt1lZbDiiX1kCixRv7Nw2Id_sDs', // USDT
        messages: [
            {
                address: 'EQ...jetton_wallet_address',
                amount: '60000000', // 0.06 TON gas budget
                payload: 'te6cckEBAQEAAgAAAA==' as Base64String,
            },
        ],
    });

    return (
        <div>
            {isFetching && <span>Estimating...</span>}
            {estimate && (
                <>
                    <div>Fee: {estimate.fee}</div>
                    <div>Valid until: {new Date(estimate.validUntil * 1000).toISOString()}</div>
                </>
            )}
        </div>
    );
    // SAMPLE_END: USE_GASLESS_ESTIMATE
};
