///<reference path="../core/Action.ts"/>
namespace b3 {
    export class Wait extends Action {
        endTime: number;
        constructor(d: { milliseconds }) {
            super({
                name: 'Wait',
                title: 'Wait <milliseconds>ms',
                properties: { milliseconds: 0 },
            });

            this.endTime = d.milliseconds || 0;
        }


        open(tick:Tick) {
            var startTime = (new Date()).getTime();
            tick.blackboard.set('startTime', startTime, tick.tree.id, this.id);
        }

       
        tick(tick:Tick) {
            var currTime = (new Date()).getTime();
            var startTime = tick.blackboard.get('startTime', tick.tree.id, this.id);

            if (currTime - startTime > this.endTime) {
                return EnumStatus.SUCCESS;
            }

            return EnumStatus.RUNNING;
        }
    }
}