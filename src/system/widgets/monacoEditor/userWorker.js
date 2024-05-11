import * as monaco from 'monaco-editor';
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker';

self.MonacoEnvironment = {
	getWorker(_, label) {
		if (label === 'css' || label === 'scss' || label === 'less') {
			return new cssWorker();
		}
		return new editorWorker();
	}
};

monaco.languages.typescript.javascriptDefaults.setEagerModelSync(true);
