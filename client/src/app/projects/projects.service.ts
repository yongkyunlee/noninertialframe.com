import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

import { PROJECTS_COLLECTION } from '../shared/constants';
import { ProjectSnippet } from './projects.model';


@Injectable({
    providedIn: 'root'
})
export class ProjectsService {
    constructor(private afs: AngularFirestore) { }

    getProjects() {
        return this.afs.collection(
                PROJECTS_COLLECTION, ref => ref.orderBy('date', 'desc'))
            .snapshotChanges()
            .pipe(
                map(actions => {
                    return actions.map(a => {
                        return {
                            id: a.payload.doc.id,
                            ...a.payload.doc.data() as ProjectSnippet
                        };
                    });
                })
            );
    }

    uploadProject(project: ProjectSnippet) {
        return this.afs.collection(PROJECTS_COLLECTION).add(project);
    }
}
