'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';
import { Trash2, Eye, EyeOff, CheckSquare, Tag, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Checkbox } from '@/components/ui/checkbox';

interface BulkActionsProps {
    selectedIds: number[];
    categories: any[];
    onClearSelection: () => void;
}

export function BulkActions({ selectedIds, categories, onClearSelection }: BulkActionsProps) {
    const { toast } = useToast();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [showCategorySelect, setShowCategorySelect] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState<number[]>([]);

    if (selectedIds.length === 0) return null;

    const handleBulkAction = async (action: string, extraData: any = {}) => {
        if (selectedIds.length === 0) return;

        setLoading(true);
        try {
            const res = await fetch('/api/admin/movies/bulk', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    movieIds: selectedIds,
                    action,
                    ...extraData
                }),
            });

            if (!res.ok) throw new Error('Failed to perform bulk action');

            const data = await res.json();
            toast({
                title: 'Успех',
                description: `${data.message || 'Операцията е изпълнена успешно'}`,
            });

            onClearSelection();
            setShowCategorySelect(false);
            setSelectedCategories([]);
            router.refresh();
        } catch (error: any) {
            toast({
                title: 'Грешка',
                description: error.message || 'Неуспешна операция',
                variant: 'destructive',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-2 p-3 bg-primary/10 border border-primary/20 rounded-xl">
                <CheckSquare className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">
                    {selectedIds.length} избрани филма
                </span>
                <div className="flex flex-wrap gap-2 ml-auto">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowCategorySelect(!showCategorySelect)}
                        disabled={loading}
                        className="h-9 rounded-xl border-secondary"
                    >
                        <Tag className="h-4 w-4 mr-2" />
                        Категории
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleBulkAction('publish')}
                        disabled={loading}
                        className="h-9 rounded-xl border-secondary"
                    >
                        <Eye className="h-4 w-4 mr-2" />
                        Публикувай
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleBulkAction('unpublish')}
                        disabled={loading}
                        className="h-9 rounded-xl border-secondary"
                    >
                        <EyeOff className="h-4 w-4 mr-2" />
                        Скрий
                    </Button>
                    <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => {
                            if (confirm(`Сигурни ли сте, че искате да изтриете ${selectedIds.length} филма?`)) {
                                handleBulkAction('delete');
                            }
                        }}
                        disabled={loading}
                        className="h-9 rounded-xl"
                    >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Изтрий
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={onClearSelection}
                        className="h-9 rounded-xl"
                    >
                        Отмени
                    </Button>
                </div>
            </div>

            {showCategorySelect && (
                <div className="p-4 bg-secondary/20 border border-secondary/50 rounded-xl animate-in slide-in-from-top-2 duration-300">
                    <p className="text-sm font-bold mb-3 uppercase tracking-wider opacity-70">Изберете категории за задаване:</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 mb-4">
                        {categories.map((cat) => (
                            <div
                                key={cat.id}
                                className={`flex items-center gap-2 p-2 rounded-lg border cursor-pointer transition-all ${selectedCategories.includes(cat.id)
                                    ? 'bg-primary/10 border-primary/50 text-primary'
                                    : 'bg-background/50 border-secondary hover:border-primary/30'
                                    }`}
                                onClick={() => {
                                    setSelectedCategories(prev =>
                                        prev.includes(cat.id) ? prev.filter(id => id !== cat.id) : [...prev, cat.id]
                                    );
                                }}
                            >
                                <Checkbox
                                    checked={selectedCategories.includes(cat.id)}
                                    className="data-[state=checked]:bg-primary data-[state=checked]:text-black"
                                />
                                <span className="text-xs font-medium truncate">{cat.name}</span>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-end gap-2">
                        <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => setShowCategorySelect(false)}
                            className="rounded-xl"
                        >
                            Отказ
                        </Button>
                        <Button
                            size="sm"
                            disabled={loading || selectedCategories.length === 0}
                            onClick={() => handleBulkAction('updateCategories', { categoryIds: selectedCategories })}
                            className="rounded-xl shadow-lg shadow-primary/20"
                        >
                            {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                            Приложи към {selectedIds.length} филма
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}

