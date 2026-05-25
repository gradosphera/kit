/**
 * Copyright (c) TonTech.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { getGaslessEstimate } from '../../actions/gasless/get-gasless-estimate';
import type {
    GetGaslessEstimateErrorType,
    GetGaslessEstimateOptions,
    GetGaslessEstimateReturnType,
} from '../../actions/gasless/get-gasless-estimate';
import type { AppKit } from '../../core/app-kit';
import type { QueryOptions, QueryParameter } from '../../types/query';
import type { Compute, ExactPartial } from '../../types/utils';
import { filterQueryOptions } from '../../utils';

export type { GetGaslessEstimateErrorType };

/**
 * Default time-to-live for a gasless estimate. The relayer returns its own
 * `validUntil`; this is the upper bound used by react-query to refresh the
 * estimate before it expires.
 */
export const GASLESS_ESTIMATE_STALE_TIME_MS = 2 * 60 * 1000;

export type GetGaslessEstimateQueryConfig<selectData = GetGaslessEstimateData> = Compute<
    ExactPartial<GetGaslessEstimateOptions>
> &
    QueryParameter<GetGaslessEstimateQueryFnData, GetGaslessEstimateErrorType, selectData, GetGaslessEstimateQueryKey>;

export const getGaslessEstimateQueryOptions = <selectData = GetGaslessEstimateData>(
    appKit: AppKit,
    options: GetGaslessEstimateQueryConfig<selectData> = {},
): GetGaslessEstimateQueryOptions<selectData> => {
    return {
        staleTime: GASLESS_ESTIMATE_STALE_TIME_MS,
        ...options.query,
        enabled: Boolean(
            options.feeJettonMaster &&
            options.messages &&
            options.messages.length > 0 &&
            (options.query?.enabled ?? true),
        ),
        queryFn: async (context) => {
            const [, parameters] = context.queryKey as [string, GetGaslessEstimateOptions];

            if (!parameters.feeJettonMaster) {
                throw new Error('feeJettonMaster is required');
            }
            if (!parameters.messages || parameters.messages.length === 0) {
                throw new Error('messages is required');
            }

            return getGaslessEstimate(appKit, parameters);
        },
        queryKey: getGaslessEstimateQueryKey(options),
    };
};

export type GetGaslessEstimateQueryFnData = Compute<Awaited<GetGaslessEstimateReturnType>>;

export type GetGaslessEstimateData = GetGaslessEstimateQueryFnData;

export const getGaslessEstimateQueryKey = (
    options: Compute<ExactPartial<GetGaslessEstimateOptions>> = {},
): GetGaslessEstimateQueryKey => {
    return ['gaslessEstimate', filterQueryOptions(options as unknown as Record<string, unknown>)] as const;
};

export type GetGaslessEstimateQueryKey = readonly ['gaslessEstimate', Compute<ExactPartial<GetGaslessEstimateOptions>>];

export type GetGaslessEstimateQueryOptions<selectData = GetGaslessEstimateData> = QueryOptions<
    GetGaslessEstimateQueryFnData,
    GetGaslessEstimateErrorType,
    selectData,
    GetGaslessEstimateQueryKey
>;
