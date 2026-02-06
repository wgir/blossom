import logger from './logger';

export function MonitorPerformance() {
    return function (
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor
    ) {
        const originalMethod = descriptor.value;

        descriptor.value = async function (...args: any[]) {
            const start = performance.now();
            try {
                const result = await originalMethod.apply(this, args);
                const end = performance.now();
                const duration = (end - start).toFixed(2);
                logger.info(`Method ${propertyKey} executed in ${duration}ms`);
                return result;
            } catch (error) {
                const end = performance.now();
                const duration = (end - start).toFixed(2);
                logger.error(`Method ${propertyKey} failed after ${duration}ms`);
                throw error;
            }
        };

        return descriptor;
    };
}
