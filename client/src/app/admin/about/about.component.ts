import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { Router } from '@angular/router';
import { AboutService } from 'src/app/about/about.service';

import 'prismjs';
import 'prismjs/components/prism-typescript.min.js';
import 'prismjs/components/prism-python.min.js';
import 'prismjs/components/prism-docker.min.js';
import 'node_modules/prismjs/components/prism-git.min.js';
import 'node_modules/prismjs/components/prism-haskell.min.js';
import 'node_modules/prismjs/components/prism-ocaml.min.js';
import 'node_modules/prismjs/components/prism-java.min.js';
import 'node_modules/prismjs/components/prism-css.min.js';
import 'node_modules/prismjs/components/prism-typescript.min.js';
import 'prismjs/plugins/line-numbers/prism-line-numbers.js';

@Component({
    selector: 'app-admin-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
    mode = 'edit';
    docId: string;
    aboutForm = this.fb.group({
        contentKor: [''],
        contentEng: ['']
    });

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private aboutService: AboutService
    ) { }

    ngOnInit() {
        this.aboutService.getAbout().subscribe(data => {
            if (data.length !== 1) {
                console.error('There is an error with the database');
            }
            this.aboutForm.patchValue({
                ...data[0]
            });
            this.docId = data[0].id;
        });
    }

    changeMode(mode: string) {
        this.mode = mode;
    }

    uploadAbout() {
        this.aboutService.updateAbout(this.docId, this.aboutForm.value)
            .then(() => {
                this.router.navigate(['/about']);
            })
            .catch(err => {
                console.error(err);
            });
    }

}
