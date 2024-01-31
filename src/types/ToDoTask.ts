export class ToDoTask {
    id: number;
    description: string;
    isCompleted: boolean = false;

    constructor(description: string) {
        this.description = description;
        this.id = new Date().getMilliseconds();
    }
}