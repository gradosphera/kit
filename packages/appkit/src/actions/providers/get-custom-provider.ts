/**
 * Copyright (c) TonTech.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import type { AppKit } from '../../core/app-kit';
import type { CustomProvider } from '../../providers';

export interface GetCustomProviderOptions<T extends CustomProvider = CustomProvider> {
    id: string;
    guard: (provider: CustomProvider) => provider is T;
}

export type GetCustomProviderReturnType<T extends CustomProvider = CustomProvider> = T | undefined;

/**
 * Get a registered custom provider by id, verified and narrowed by the guard.
 */
export const getCustomProvider = <T extends CustomProvider>(
    appKit: AppKit,
    options: GetCustomProviderOptions<T>,
): GetCustomProviderReturnType<T> => {
    return appKit.customProvidersManager.getProvider(options.id, options.guard);
};
