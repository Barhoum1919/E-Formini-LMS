import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatmsg',
  standalone: true
})
export class FormatmsgPipe implements PipeTransform {

    transform(value: string): string {
      if (!value) return '';
      // Replace **text** with <strong>text</strong>
      value = value.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      // Replace *text* with <em>text</em>
      value = value.replace(/\*(.*?)\*/g, '<em>$1</em>');
      // Replace newlines with <br>
      value = value.replace(/\n/g, '<br>');
      return value;
    }

}
