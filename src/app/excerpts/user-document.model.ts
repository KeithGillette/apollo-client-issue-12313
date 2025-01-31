import {Prop} from '@typegoose/typegoose';
import {CollectionEntityBase} from './collection-entity-base.model';
import {IUserDocument, IUserServices} from './user-document.type';
import {UserEventName} from './user-event.types';


class UserEmail {
  @Prop() public address: string;
  @Prop() public verified: boolean;
}

class UserProfile {
  @Prop() public nameFirst: string;
  @Prop() public nameLast: string;
  @Prop() public referralCode: string;
  @Prop() public visitorId: string;
  @Prop({type: () => [UserEvent], _id: false}) public eventList: UserEvent[];
}

class UserEvent {
  @Prop({type: String}) public name: UserEventName;
  @Prop() public dateTime: Date;
}

export class UserDocument extends CollectionEntityBase implements IUserDocument {
  @Prop() public username?: string | undefined;
  @Prop({type: () => [UserEmail], _id: false}) public emails?: UserEmail[] | undefined;
  @Prop({_id: false}) public profile?: UserProfile;
  public services?: IUserServices;
  public deactivated: boolean;
  public id: string;
}
