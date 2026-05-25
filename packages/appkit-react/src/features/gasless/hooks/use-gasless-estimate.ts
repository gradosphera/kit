/**
 * Copyright (c) TonTech.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

'use client';

import { getGaslessEstimateQueryOptions } from '@ton/appkit/queries';
import type {
    GetGaslessEstimateData,
    GetGaslessEstimateErrorType,
    GetGaslessEstimateQueryConfig,
} from '@ton/appkit/queries';

import { useAppKit } from '../../settings';
import { useQuery } from '../../../libs/query';
import type { UseQueryReturnType } from '../../../libs/query';

export type UseGaslessEstimateParameters<selectData = GetGaslessEstimateData> =
    GetGaslessEstimateQueryConfig<selectData>;

export type UseGaslessEstimateReturnType<selectData = GetGaslessEstimateData> = UseQueryReturnType<
    selectData,
    GetGaslessEstimateErrorType
>;

/**
 * Hook to fetch a gasless estimate. Auto-refetches as inputs change.
 *
 * The estimate carries a relayer-provided `validUntil` window; cached results
 * become stale after `GASLESS_ESTIMATE_STALE_TIME_MS` (2 minutes).
 */
export const useGaslessEstimate = <selectData = GetGaslessEstimateData>(
    parameters: UseGaslessEstimateParameters<selectData> = {},
): UseGaslessEstimateReturnType<selectData> => {
    const appKit = useAppKit();

    return useQuery(getGaslessEstimateQueryOptions(appKit, parameters));
};
