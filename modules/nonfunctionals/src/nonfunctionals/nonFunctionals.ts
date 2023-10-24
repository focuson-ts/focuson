//Copyright (c)2020-2023 Philip Rice. <br />Permission is hereby granted, free of charge, to any person obtaining a copyof this software and associated documentation files (the Software), to dealin the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:  <br />The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software. THE SOFTWARE IS PROVIDED AS
import {combine, combineK, NonFunctionalExecutorsForFunctions, NonFunctionalExecutorsForPromiseFunctions, PartialProfunctor, Wrapper, WrapperK} from "../profunctor/Profunctor";
import {ErrorHandler} from "../errors/errrors";
import {loggingProfunctor, LogPrinter} from "../logging/loggingProfunctor";
import {metricsProfunctor, MetricsStore} from "../metrics/metrics";


export var globalDebug = true
function debug(logPrinter: LogPrinter): PartialProfunctor {
    return {
        name: "debug",
        pre(msg) { },
        post(msg, input, output) {if (globalDebug) logPrinter(msg, input, output) }
    }
}


export class NonFunctionalsForFunction {
    executor: NonFunctionalExecutorsForFunctions = new NonFunctionalExecutorsForFunctions()
    metrics: PartialProfunctor;
    logger: PartialProfunctor
    private errorHandler: ErrorHandler;
    private debug: PartialProfunctor;
    constructor(metricsStore: MetricsStore, errorHandler: ErrorHandler, logPrinter: LogPrinter) {
        this.errorHandler = errorHandler;
        this.metrics = metricsProfunctor(metricsStore)
        this.logger = loggingProfunctor(logPrinter)
        this.debug = debug(logPrinter)
    }

    addLogging(msg: string): Wrapper {return this.executor.normals(this.logger, msg)}
    addMetrics(msg: string): Wrapper { return this.executor.normals(this.metrics, msg)}
    addErrors(msg: string): Wrapper {return this.executor.errors(this.errorHandler, msg)}
    addDebug(msg: string): Wrapper {return this.executor.normals(this.debug, msg)}

    addAll(msg: string): Wrapper {return combine(this.addLogging(msg), this.addMetrics(msg), this.addErrors(msg), this.addDebug(msg))}
}


export class NonFunctionalsForPromiseFunctions {
    executor: NonFunctionalExecutorsForPromiseFunctions = new NonFunctionalExecutorsForPromiseFunctions()
    metrics: PartialProfunctor;
    private errorHandler: ErrorHandler;
    private logger: PartialProfunctor;
    private debug: PartialProfunctor;
    constructor(metricsStore: MetricsStore, errorHandler: ErrorHandler, logPrinter: LogPrinter) {
        this.errorHandler = errorHandler;
        this.metrics = metricsProfunctor(metricsStore)
        this.logger = loggingProfunctor(logPrinter)
        this.debug = debug(logPrinter)
    }

    addLogging(msg: string): WrapperK {return this.executor.normals(this.logger, msg)}
    addMetrics(msg: string): WrapperK { return this.executor.normals(this.metrics, msg)}
    addErrors(msg: string): WrapperK {return this.executor.errors(this.errorHandler, msg)}
    addDebug(msg: string): WrapperK {return this.executor.normals(this.debug, msg)}

    addAll(msg: string): WrapperK {return combineK(this.addLogging(msg), this.addMetrics(msg), this.addErrors(msg), this.addDebug(msg))}

}