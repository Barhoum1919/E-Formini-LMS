export class Instructor{
      name:string;
      description:string;
      salary:number;
      subjectId:string;
      startedDate:Date;
      urlImage:string;

    constructor(name:string, description:string,salary:number,subjectId:string,startedDate:Date,imgurl:string){
        this.name = name;
        this.description = description;
        this.subjectId=subjectId;
        this.salary=salary;
        this.startedDate=startedDate;
        this.urlImage=imgurl;
    }
             

}