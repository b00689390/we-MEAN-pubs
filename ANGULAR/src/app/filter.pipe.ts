import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(venues: any, term: any): any {
    
    if (term === undefined) return venues;

    return venues.filter(function(venue){
      return venue.name.toLowerCase().includes(term.toLowerCase());
    })
  }


}
