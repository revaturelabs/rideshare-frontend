export class Configuration {
    configuration_id : number;
    label : string;
    value : string;

    constructor(configuration_id : number, label : string, value : string) {
        this.configuration_id = configuration_id;
        this.label = label;
        this.value = value;
    }
}