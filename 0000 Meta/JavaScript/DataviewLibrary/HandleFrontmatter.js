class FrontmatterHandler {
    constructor() {
        this.processFrontMatter = app.fileManager.processFrontMatter.bind(app.fileManager);
    }

    readFrontmatter(noteFile) {
        return new Promise((resolve, reject) => {
            const lambda = (frontmatter) => {
                resolve(frontmatter);
            }

            this.processFrontMatter(noteFile, lambda).then(() => {
                console.info("Frontmatter successfully read.");
            }).catch((error) => {
                console.error("Error reading frontmatter:", error);
                reject(error);
            });
        });
    }

    createProperty(noteFile, propertyName, propertyValue){
        return new Promise((resolve, reject) => {
            const lambda = (frontmatter) => {
                frontmatter[propertyName] = propertyValue;
                resolve(frontmatter);
            }

            this.processFrontMatter(noteFile, lambda).then(() => {
                console.info("Frontmatter successfully added unto.");
            }).catch((error) => {
                console.error("Error adding to frontmatter:", error);
                reject(error);
            });
        });
    }

    editProperty(noteFile, propertyName, propertyNewValue) {
        return new Promise((resolve, reject) => {
            const lambda = (frontmatter) => {
                frontmatter[propertyName] = propertyNewValue;
                resolve(frontmatter);
            }

            this.processFrontMatter(noteFile, lambda).then(() => {
                console.info("Frontmatter successfully modified.");
            }).catch((error) => {
                console.error("Error modifying frontmatter:", error);
                reject(error);
            });
        });
    }

    editProperties(noteFile, properties) {
        return new Promise((resolve, reject) => {
            const lambda = (frontmatter) => {
                for (const propertyName in properties) {
                    if (Object.hasOwnProperty.call(properties, propertyName)) {
                        frontmatter[propertyName] = properties[propertyName];
                    }
                }
                resolve(frontmatter);
            }

            this.processFrontMatter(noteFile, lambda)
                .then(() => {
                    console.info("Frontmatter successfully modified.");
                    resolve();
                })
                .catch((error) => {
                    console.error("Error modifying frontmatter:", error);
                    reject(error);
                });
        });
    }
}

module.exports = {
    FrontmatterHandler
}