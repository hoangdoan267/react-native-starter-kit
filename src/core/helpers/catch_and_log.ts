import { recordError } from './record_error';
export const catchAndLog = (action: (...actionArgs: any[]) => Promise<void>, finallyAction: (() => Promise<void>) | undefined = undefined) => {
    return async (...args: any[]) => {
        try {
            await action(...args);
        } catch (error) {
            recordError(error);
        } finally {
            try {
                if (finallyAction) {
                    await finallyAction();
                }
            } catch (error) {
                recordError(error);
            }
        }
    };
};
