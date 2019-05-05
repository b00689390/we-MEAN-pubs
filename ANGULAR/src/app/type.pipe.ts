import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'type'
})
export class TypePipe implements PipeTransform {

  transform(venues: any, search: any): any {
    
    if (search === undefined) return venues;

    return venues.filter(function(venue){
      return venue.type.includes(search);
    })
  }

}
