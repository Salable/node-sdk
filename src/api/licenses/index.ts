import { Base } from '../base';
// import { NewPost, Post } from "./types";

const resourceName = 'licenses';

export class Licenses extends Base {
  getLicenses(): Promise<any[]> {
    return this.request(`/${resourceName}`);
  }

  createLicense(newPost: any): Promise<any> {
    return this.request(`/${resourceName}`, {
      method: 'POST',
      body: JSON.stringify(newPost),
    });
  }
}
