'use client';

import { useState } from 'react';
import Button from "@/components/Button";

const topics = [
    { id: 'website', label: 'ウェブサイト作成' },
    { id: 'blog', label: 'ブログ執筆' },
    { id: 'design', label: 'グラフィックデザイン' },
    { id: 'other', label: 'その他' }
];

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        company: '',
        position: '',
        email: '',
        topic: '',
        message: ''
    });

    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = '名前を入力してください';
        }

        if (!formData.company.trim()) {
            newErrors.company = '企業名を入力してください';
        }

        if (!formData.position.trim()) {
            newErrors.position = '役職を入力してください';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'メールアドレスを入力してください';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = '有効なメールアドレスを入力してください';
        }

        if (!formData.topic) {
            newErrors.topic = 'トピックを選択してください';
        }

        if (!formData.message.trim()) {
            newErrors.message = 'メッセージを入力してください';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        // ここでフォームデータの送信処理を実装
        // 例: API エンドポイントへのPOSTリクエスト

        setSubmitted(true);
        setFormData({
            name: '',
            company: '',
            position: '',
            email: '',
            topic: '',
            message: ''
        });
    };

    if (submitted) {
        return (
            <div className="max-w-2xl mx-auto mt-12 p-6">
                <div className="bg-green-50 border-l-4 border-green-400 p-4">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="ml-3">
                            <p className="text-sm text-green-700">
                                お問い合わせありがとうございます。2営業日以内に返信します。
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto mt-12 p-6">
            <h1 className="text-2xl font-bold mb-8">お問い合わせ</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        お名前 *
                    </label>
                    <input
                        type="text"
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                    {errors.name && (
                        <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700">
                        企業名 *
                    </label>
                    <input
                        type="text"
                        id="company"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                    {errors.company && (
                        <p className="mt-1 text-sm text-red-600">{errors.company}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="position" className="block text-sm font-medium text-gray-700">
                        役職 *
                    </label>
                    <input
                        type="text"
                        id="position"
                        value={formData.position}
                        onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                    {errors.position && (
                        <p className="mt-1 text-sm text-red-600">{errors.position}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        メールアドレス *
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                    {errors.email && (
                        <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="topic" className="block text-sm font-medium text-gray-700">
                        トピック *
                    </label>
                    <select
                        id="topic"
                        value={formData.topic}
                        onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    >
                        <option value="">選択してください</option>
                        {topics.map((topic) => (
                            <option key={topic.id} value={topic.id}>
                                {topic.label}
                            </option>
                        ))}
                    </select>
                    {errors.topic && (
                        <p className="mt-1 text-sm text-red-600">{errors.topic}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                        メッセージ *
                    </label>
                    <textarea
                        id="message"
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                    {errors.message && (
                        <p className="mt-1 text-sm text-red-600">{errors.message}</p>
                    )}
                </div>

                <div>
                    <Button
                        type="submit"
                        variant="secondary"
                    >
                        送信する
                    </Button>
                </div>
            </form>
        </div>
    );
}