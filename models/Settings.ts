import mongoose, { Schema, Document } from 'mongoose';

export interface ISettings extends Document {
  tiktokVideoUrl: string;
  updatedAt: Date;
}

const SettingsSchema: Schema = new Schema({
  tiktokVideoUrl: {
    type: String,
    required: false,
    default: 'https://www.tiktok.com/@alwaysbullish1',
  },
}, {
  timestamps: true,
});

export default mongoose.models.Settings || mongoose.model<ISettings>('Settings', SettingsSchema);