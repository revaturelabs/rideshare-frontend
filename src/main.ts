import * as _ from "lodash";
import { enableProdMode, NgZone } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .then((moduleInstance) => {
    const ngZone = moduleInstance.injector.get(NgZone);
    setInterval(() => {
        var taskTrackingZone = (<any>ngZone)._inner.getZoneWith("TaskTrackingZone");
        if (!taskTrackingZone) {
            throw new Error("'TaskTrackingZone' zone not found! Have you loaded 'node_modules/zone.js/dist/task-tracking.js'?");
        }
        var tasks: any[] = taskTrackingZone._properties.TaskTrackingZone.getTasksFor("macroTask");
        tasks = _.clone(tasks);
        if (_.size(tasks) > 0) {
            console.log("ZONE pending tasks=", tasks);
        }
    }, 1000);
  })
  .catch(err => console.error(err));
