export default function getEnv(envName){
    const env=import.meta.env[envName]
    return env
}