import { Injectable } from "@angular/core";
import { CognitoUtil } from "./cognito.service";
import { environment } from "../../../environments/environment";

import * as AWS from "aws-sdk/global";
import * as CloudWatchLogs from "aws-sdk/clients/cloudwatchlogs";

@Injectable()
export class CloudWatchLogsService {

    constructor(public cognitoUtil: CognitoUtil) {
        console.log("CloudWatchService: constructor");
    }

    getAWS() {
        return AWS;
    }

    getLogEntries(requestArray: Array<object>) {
        let cloudwatchlogs = new CloudWatchLogs();

        let params = {
            logGroupName: '/dae/C2SEmulatorApp/Debug',  /* required */
            logStreamName: 'awsRequest-Passed', /* required */
            // endTime: 0,
            limit: 40,
            // nextToken: 'STRING_VALUE',
            // startFromHead: true || false,
            // startTime: 0
        };

        cloudwatchlogs.getLogEvents(params, onQuery);

        function onQuery(err, data) {
            if (err) {
                console.error("CloudWatchLogsService: Unable to query the table. Error JSON:", JSON.stringify(err, null, 2));
            } else {
                data.events.forEach(function (logitem) {
                    requestArray.push(JSON.parse(logitem.message));
                    console.log(typeof logitem)
                });
            }
        }
    }
}
